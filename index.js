const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { ok } = require("assert")
const app = express()

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({ extended: true }))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

app.get("/kubus/:sisi", (req, res) => {
    let s = req.params.sisi
    let volume = s**3
    let luasp = 6 * s**2

    let response = {
        sisi : s,
        volume : volume,
        luas_permukaan : luasp
    }
    res.json(response)
})
app.get("/balok/:panjang/:lebar/:tinggi", (req,res) => {
    let p = req.params.panjang
    let l = req.params.lebar
    let t = req.params.tinggi
    let volume = p*l*t
    let luasp = 2 * ((p*l) + (p*t) + (l*t))

    let response = {
        Panjang : p,
        Lebar : l,
        Tinggi : t,
        Volume : volume,
        luas_permukaan : luasp
    }
    res.json(response)
})
app.get("/tabung/:r/:t", (req, res) => {
    const phi = 3.14
    let t = req.params.t
    let r = req.params.r
    let v = phi * r**2 * t
    let l = phi * 2 * r * ( r + t)

    let response = {
        Jari_jari : r,
        Tinggi : t,
        Volume : v,
        luas_permukaan : l
    }
    res.json(response)
})
app.get("/bola/:r", (req, res) => {
    const phi = 3.14
    let r = req.params.r
    
    let v = 4/3 * phi *  r**3
    let l = 4 *phi* r**2

    let response = {
        Jari_jari : r,
        Volume : v,
        luas_permukaan : l
    }
    res.json(response)
})
app.get("/convert/celcius/:n", (req, res) => {
    let n = req.params.n
    let r = 4/5 * n
    let f = 9/5 * n + 32
    let k = n * 1 + 273

    let response = {
        celcius : n,
        "result" : {
            reamur : r,
            fahrenheit : f,
            kelvin : k
        }
    }
    res.json(response)
})
app.get("/convert/reamur/:n", (req, res) => {
    let n = req.params.n
    let c = 5/4 * n
    let f = 9/4 * n + 32
    let k = 5/4 * n + 273

    let response = {
        reamur : n,
        "result" : {
            celcius : c,
            fahrenheit : f,
            kelvin : k
        }
    }
    res.json(response)
})
app.get("/convert/kelvin/:n", (req, res) => {
    let n = req.params.n
    let c = n - 273
    let r = 4/5 * (n - 273)
    let f = 9/5 * (n - 273) + 32

    let response = {
        kelvin : n,
        "result" : {
            celcius : c,
            fahrenheit : f,
            reamur : r
        }
    }
    res.json(response)
})
app.get("/convert/fahrenheit/:n", (req, res) => {
    let n = req.params.n
    let c = 5/9 * (n - 32) 
    let r = 4/9 * (n - 32)
    let k = 5/9 * (n - 32) + 273

    let response = {
        fahrenheit : n,
        "result" : {
            celcius : c,
            kelvin : k,
            reamur : r
        }
    }
    res.json(response)
})
app.post("/desimal", (req, res) => {
    let n = Number(req.body.n)
    let biner = n.toString(2)
    let oktal = n.toString(8)
    let hexa = n.toString(16).toUpperCase()

    let response = {
        Desimal : n,
        "result" : {
            biner : biner,
            oktal : oktal,
            hexa : hexa
        }
    
    }
    res.json(response)
})
app.post("/biner", (req, res) => {
    let n = Number(req.body.n)
    let desimal = parseInt(n, 2)
    let oktal = desimal.toString(8)
    let hexa = desimal.toString(16).toUpperCase()

    let response = {
        Biner : n,
        result : {
            Desimal : desimal,
            Oktal : oktal,
            Hexa : hexa
        }
    }
    res.json(response)
})
app.post("/oktal", (req, res) => {
    let n = Number(req.body.n)
    let desimal = parseInt(n, 8)
    let biner = desimal.toString(2)
    let hexa = desimal.toString(16).toUpperCase()
    let response = {
        Oktal : n,
        result : {
            Desimal : desimal,
            Biner : biner,
            Hexa : hexa
        }
    }
    res.json(response)
})
app.post("/hexa", (req, res) => {
    let n = (req.body.n)
    let desimal = parseInt(n, 16)
    let biner = desimal.toString(2)
    let oktal = desimal.toString(8)
    let response = {
        Hexa : n,
        result : {
            Desimal : desimal,
            Biner : biner,
            Oktal : oktal
        }
    }
    res.json(response)
})

app.post("/bmi", (req, res) => {
    let tinggi = Number(req.body.tinggi)
    let berat = Number(req.body.berat)
    let bmi = berat/tinggi**2
    let stts = ""
    if(bmi < 18.5){
        stts = "Kekurangan berat badan"
    }
    else if(bmi >= 18.5 && bmi < 25){
        stts = "Normal(Ideal)"
    }
    else if(bmi >= 25 && bmi <30){
        stts = "Kelebihan berat badan"
    }
    else{
        stts = "Kegemukan"
    }
    let response = {
        tinggi : tinggi,
        berat : berat,
        bmi : bmi,
        status : stts
    }
    res.json(response)
})

app.listen(8000, () => {
    console.log("Server run on port 8000");
})