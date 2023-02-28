const express = require('express');
const pool = require('../database');
const router = express.Router();

//URL BASE: link/....

router.get('/', async (req,res)=>{
    
    const links = await pool.query('SELECT * FROM links'); //Where userId...

    res.send(links);
})


router.post('/', async (req,res)=>
{
    const {title, url, description} = req.body;

    const newLink = {
        title,
        url,
        description
    }  

    const response = await pool.query('INSERT INTO links set ?', [newLink]);

    res.send("Link added succesfully");
    
})
router.put('/:linkId', async (req,res) => {

    const {title, url, description} = req.body;
    const linkId = req.params.linkId;

    const response = await pool.query(`UPDATE links SET title = ${title} url = ${url} description = ${description} WHERE linkId = ${linkId}`);

    res.send("Link updated succesfully");
})

router.delete('/:linkId', async (req,res) => {
    const linkId = req.params.linkId;

    const response = await pool.query(`DELETE FROM links WHERE linkId = ?`, [linkId]);

    res.send("Link deleted succesfully");
})

module.exports = router;