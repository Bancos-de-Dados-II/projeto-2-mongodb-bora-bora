import React from "react"
import './Rodape.css'

const Rodape: React.FC = () => {
    return (
        <footer className="Rodape">
            <div className="texto-rodape">
                <p>Visite nossas redes sociais e veja os eventos que nossos usuários estão compartilhando!</p>
            </div>
            <div className="redes-sociais">
                <a className="social-icon" href="#">
                    <i className="bi bi-instagram"></i>
                </a>
                <a className="social-icon" href="#">
                    <i className="bi bi-facebook"></i>
                </a>
                <a className="social-icon" href="#">
                    <i className="bi bi-twitter-x"></i>
                </a>
            </div>
        </footer>
    )
}

export default Rodape;