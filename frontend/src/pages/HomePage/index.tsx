
import './style.css'
import cors from 'cors';
import express from 'express';
import Banner from '../../components/Banner/Banner';
import BannerCentral from '../../components/BannerCentral/BannerCentral';
import BannerSuspenso from '../../components/BannerSuspenso/BannerSuspenso';
import Botao from '../../components/Botao/Botao';
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import Menu from '../../components/Menu/Menu';
import Rodape from '../../components/Rodape/Rodape';

const HomePage: React.FC = () => {
  /* const teste = express();
  teste.use(cors());
  async function exe() {
    let url = await fetch('https://nominatim.openstreetmap.org/ui/search.html?country=brazil');
    console.log(url);
  }
  exe(); */

  return (
    <div className='HomePage'>
      <Cabecalho/>
      <Banner/>
      <BannerCentral/>
      <div className='banner-container'>
        <BannerSuspenso mensagem='Planejar um evento nunca foi tão fácil!' cor='#34c5ff'/>
        <BannerSuspenso mensagem='Evite dor de cabeça, crie seu evento no BoraBora e curta tranquilo!' cor='#00bfa6'/>
        <BannerSuspenso mensagem='Clicou, planejou, curtiu!' cor='#34c5ff'/>
      </div>
      <Rodape/>

      {/* <Cabecalho/>
      <Menu/>
      <Rodape/> */}
    </div>
  );
};

export default HomePage;
