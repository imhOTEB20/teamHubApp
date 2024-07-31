import card1 from '../assets/card-1.jpeg'
import card2 from '../assets/card-2.jpeg'
import card3 from '../assets/card-3.jpeg'
import card4 from '../assets/card-4.jpeg'
import photoProfile from '../assets/maxi-soriano.jpg'

import '../styles/Main.css'

function Main() {

  return (
    <>
      <main>
        <section className="banner">
            <article>
                <h1>Bienvenid@ a MootMate</h1>
                <h2>Diseñada para realizar reuniones online</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, blanditiis nihil. Molestiae dolorum voluptas ut, quaerat ipsa, ducimus modi aliquid accusantium deleniti, cum dignissimos reiciendis dolores ex quidem id quo, ipsum dolor sit amet consectetur adipisicing elit. A, blanditiis nihil. Molestiae dolorum voluptas ut, quaerat ipsa, ducimus modi aliquid accusantium deleniti, cum dignissimos reiciendis dolores ex quidem id quo.
                </p>
                <div className="contenedor-boton-registrarse">
                    <a href="">REGISTRARSE</a>
                </div>
            </article>
        </section>
        <section id="Nosotros" className="descripcion-app-1">
            <artlcle className="imagen-descripcion">
            </artlcle>
            <artlcle className="descripcion">
                <h2>Crea un lugar solo para tus miembros en el que encajes</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque magnam minus saepe illo veniam iste fugit magni nulla quasi error odio, quam est explicabo aliquid rem impedit asperiores doloribus ullam!</p>
            </artlcle>
        </section>
        <section className="descripcion-app-2">
            <artlcle className="descripcion">
                <h2>Crea un lugar solo para tus miembros en el que encajes</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque magnam minus saepe illo veniam iste fugit magni nulla quasi error odio, quam est explicabo aliquid rem impedit asperiores doloribus ullam!</p>
            </artlcle>
            <artlcle className="imagen-descripcion">
            </artlcle>
        </section>
        <section className="descripcion-app-3">
            <artlcle className="imagen-descripcion">
            </artlcle>
            <artlcle className="descripcion">
                <h2>Crea un lugar solo para tus miembros en el que encajes</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque magnam minus saepe illo veniam iste fugit magni nulla quasi error odio, quam est explicabo aliquid rem impedit asperiores doloribus ullam!</p>
            </artlcle>
        </section>
        <section id="Sistema" className="cards-sistemas">
            <article className="card-s">
                <img src={card1} alt="img-card-1"/>
                <h4>Titulo 1</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat eveniet error consequatur hic natus exercitationem, dolorem officiis, repellendus est corporis porro. Unde, distinctio ipsa eius labore eos odio consequuntur doloremque.</p>
                <a href="#" className="btn-card">Ver más</a>
            </article>
            <article className="card-s">
                <img src={card2} alt="img-card-2"/>
                <h4>Titulo 2</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <a href="#" className="btn-card">Ver más</a>
            </article>
            <article className="card-s">
                <img src={card3} alt="img-card-3"/>
                <h4>Titulo 3</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat eveniet error consequatur hic natus exercitationem, dolorem officiis, repellendus est corporis porro. Unde, distinctio ipsa eius labore eos odio consequuntur doloremque.</p>
                <a href="#" className="btn-card">Ver más</a>
            </article>
            <article className="card-s">
                <img src={card4} alt="img-card-4"/>
                <h4>Titulo 4</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <a href="#" className="btn-card">Ver más</a>
            </article>
        </section>
        <section id="Desarrolladores" className="card-desarroladores">
            <article className="card-desarrolador">
                <div className="head">
                    <div className="circulo"></div>
                    <div className="contenedor-img">
                        <img src={photoProfile} alt="perfil-1"/>
                    </div>
                </div>
                <div className="descripcion">
                    <h3>Nombre y Apellido</h3>
                    <h4>Developer Python Flask</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="redes">
                    <a href=""><i className="lab la-github"></i></a>
                    <a href=""><i className="lab la-linkedin"></i></a>
                    <a href=""><i className="lab la-whatsapp"></i></a>
                </div>
            </article>
            <article className="card-desarrolador">
                <div className="head">
                    <div className="circulo"></div>
                    <div className="contenedor-img">
                        <img src={photoProfile} alt="perfil-1"/>
                    </div>
                </div>
                <div className="descripcion">
                    <h3>Maximiliano Soriano</h3>
                    <h4>Developer Full Stack</h4>
                    <p>Herramientas: html, css, js, python, php, mysql and flutter.</p>
                </div>
                <div className="redes">
                    <a href=""><i className="lab la-github"></i></a>
                    <a href=""><i className="lab la-linkedin"></i></a>
                    <a href=""><i className="lab la-whatsapp"></i></a>
                </div>
            </article>
        </section>
      </main>
    </>
  )
}

export default Main
