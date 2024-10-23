import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])








  return (
    <div>
      <div> <Navbar /></div>
      <div > <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 " type="search" placeholder="Search in..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://www.giantbomb.com/a/uploads/scale_medium/0/1725/1245432-burger__1_.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://th.bing.com/th/id/OIP.w8Ih10ZVRCvQbGaRHSOxWQHaE8?rs=1&pid=ImgDetMain" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://westernnews.media.clients.ellingtoncms.com/img/photos/2017/10/17/AdobeStock_72074194.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://th.bing.com/th/id/OIP.G-vhbcreHWX5gzd4XhVIMQHaE2?rs=1&pid=ImgDetMain" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> </div>
      <div className='container'>
          {
            foodCat.length!==0 ?
              foodCat.map((data) => {
                return (
                  <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                    </div>
                    <hr/>
                    {
                      foodItem.length!==0
                        ? foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                          .map(filterItems => {
                            return (
                              <div key={filterItems._id} className='col- 12 col-md-6 col-lg-3 mb-3'> 
                                <Card foodItem={filterItems}
                                options= {filterItems.options[0]}
                                // imgSrc={filterItems.img}
                                ></Card>
                              </div>
                            );
                          })
                        : <div>No Such Data Found</div>
                    }
                  </div>
                )
              }):""
            }
          {/* <Card /> */}
        </div>
        <div> <Footer /> </div>
      </div>
      )
}