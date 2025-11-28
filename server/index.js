require('dotenv').config()
const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeSecretKey ? Stripe(stripeSecretKey) : null
const fs = require('fs')
const path = require('path')
const opsFile = path.join(__dirname, 'operations.json')

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body
  if(!items || !items.length) return res.status(400).json({ error: 'No items' })
  if(!stripe) return res.json({ url: null })

  const line_items = items.map(i => ({ price_data: { currency: 'brl', product_data: { name: i.title, images: [i.image] }, unit_amount: Math.round(i.price * 100) }, quantity: i.qty }))

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: process.env.SUCCESS_URL || 'http://localhost:5173/',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:5173/'
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'stripe error' })
  }
})

// Save operations to file
app.post('/operations', (req, res) => {
  const body = req.body
  if(!body) return res.status(400).json({ error: 'missing body' })
  // body can be an array or single op
  const opsToAdd = Array.isArray(body) ? body : [body]
  let existing = []
  try {
    const raw = fs.readFileSync(opsFile, 'utf8')
    existing = JSON.parse(raw || '[]')
  } catch (err) {
    existing = []
  }
  const merged = existing.concat(opsToAdd)
  try {
    fs.writeFileSync(opsFile, JSON.stringify(merged, null, 2))
    res.json({ success: true, count: merged.length })
  } catch (err) {
    console.error('write ops error', err)
    res.status(500).json({ error: 'could not write operations' })
  }
})

// Read operations
app.get('/operations', (req, res) => {
  try {
    if(!fs.existsSync(opsFile)) return res.json([])
    const raw = fs.readFileSync(opsFile, 'utf8')
    const data = JSON.parse(raw || '[]')
    res.json(data)
  } catch (err) {
    console.error('read ops error', err)
    res.status(500).json({ error: 'could not read operations' })
  }
})

const port = process.env.PORT || 4242
app.listen(port, ()=>console.log('Stripe server running on port', port))
