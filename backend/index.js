import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express() //創建伺服器
const prisma = new PrismaClient() //與資料庫建立連接
const PORT = process.env.PORT || 3000 //優先從環境變數取得PORT

//避免跨域問題，啟用cors
app.use(cors())
app.use(express.json()) //解析json格式的請求

//get all users
app.get("/users", async (req, res) => {
	try {
		const users = await prisma.users.findMany()
		res.json(users)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "查詢失敗" })
	}
})

//get single user
app.get("/users/:id", async (req, res) => {
	const { id } = req.params //取得id
	try {
		const user = await prisma.users.findUnique({
			where: { id: Number(id) },
		})
		if (!user) {
			return res.status(404).json({ message: "查無該用戶" })
		}
		res.json(user)
	} catch (error) {
		console.error(error)
		return res.status(500), json({ message: "查無該用戶" })
	}
})

//add users post
app.post("/users", async (req, res) => {
	const { name, email, password } = req.body //解析後數據
	if (!name || !email || !password) {
		return res.status(400).json({ message: "所有欄位必填" })
	}
	try {
		const NewUser = await prisma.users.create({
			data: { name, email, password },
		})
		res.json(NewUser)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "創建用戶失敗" })
	}
})

//add order posts
app.post("/orders", async (req, res) => {
	const { title, total, date, user_id, meals } = req.body
	if (!title || !total || !date || !user_id || !meals) {
		return res.status(400).json({ message: "所有欄位必填" })
	}
	try {
		const NewOrder = await prisma.orders.create({
			data: {
				title,
				total,
				date: new Date(date),
				user_id,
				meals: {
					createMany: {
						data: meals.map((meals) => ({
							name: meals.name,
							price: meals.price,
							quantity: meals.quantity,
						})),
					},
				},
				include: {
					meals: true,
				},
			},
		})
		res.status(201).json("成功紀錄")
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "訂餐失敗" })
	}
})

//get user orders
app.get("/orders/:id/meals", async (req, res) => {
	const { id } = req.params //get id
	try {
		const UserOrder = await prisma.orders.findMany({
			where: {
				id: Number(id),
			},
		})
		if (!UserOrder.length) {
			return res.status(404).json({ message: "沒有此訂單" })
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "查無該筆訂單" })
	}
})

//update user
app.put("/users/:id", async (req, res) => {
	const { id } = req.params //get id
	const { name, email, password } = req.body //get data
	try {
		const user = await prisma.users.findUnique({
			where: { id: Number(id) },
		})

		if (!user) {
			return res.status(404).json({ message: "查無用戶" })
		}

		const UpdateUser = await prisma.users.update({
			where: { id: Number(id) },
			data: {
				name,
				email,
				password,
			},
		})

		res.status(200).json(UpdateUser)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "修改用戶失敗" })
	}
})

//delete user
app.delete("/users/:id", async (req, res) => {
	const { id } = req.params
	try {
		//check user
		const user = await prisma.users.findUnique({
			where: { id: Number(id) },
		})
		if (!user) {
			return res.status(404).json({ message: "查無該用戶" })
		}

		//delete user
		const DeleteUser = await prisma.users.delete({
			where: { id: Number(id) },
		})
		res.status(200).json(DeleteUser)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "刪除失敗" })
	}
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
