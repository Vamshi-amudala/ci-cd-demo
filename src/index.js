const express = require('express');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for items
let items = [
    { id: 1, name: "JavaScript", description: "Popular web programming language", category: "Language" },
    { id: 2, name: "React", description: "JavaScript library for building user interfaces", category: "Framework" },
    { id: 3, name: "Node.js", description: "JavaScript runtime for server-side applications", category: "Runtime" },
    { id: 4, name: "Express.js", description: "Web application framework for Node.js", category: "Framework" },
    { id: 5, name: "MongoDB", description: "NoSQL database for flexible data storage", category: "Database" }
];

app.get('/', (req, res)=>{
    res.end("This is home page.. \nWelcome to home page");
})

app.get('/service', (req, res)=>{
    res.end("This is service page..")
})

app.get('/data', (req, res)=>{
    res.json(items);
})

app.post('/data', (req, res)=>{
    try {
        const { name, description, category } = req.body;
        
        // Validation
        if (!name || !description || !category) {
            return res.status(400).json({ error: "Missing required fields: name, description, category" });
        }
        
        // Create new item
        const newItem = {
            id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
            name,
            description,
            category
        };
        
        // Add to array
        items.push(newItem);
        
        res.status(201).json({ 
            message: "Item created successfully", 
            data: newItem 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server started on port : ${PORT}`);
});