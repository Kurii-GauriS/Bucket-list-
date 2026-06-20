<h1>STRAY-KIDS</h1>
<h4>Creating my own bucket list as a STAY or
<h1>STAAAAA.....</h1></h4>

Bucket-List<br>
│<br>
├── index.html<br>
├── style.css<br>
├── script.js<br>
│<br>
└── images<br>
    ├── bangchan.jpg<br>
    ├── leeknow.jpg<br>
    ├── changbin.jpg<br>
    ├── hyunjin.jpg<br>
    ├── han jisung.jpg<br>
    ├── felix.jpg<br>
    ├── seungmin.jpg<br>
    ├── Jeong-in.jpg<br>


    .gallery{
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    gap:25px;
    max-width:1200px;
    margin:40px auto;
    justify-items:center;
}

@media (max-width: 1000px){
    .gallery{
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px){
    .gallery{
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px){
    .gallery{
        grid-template-columns: 1fr;
    }
}