
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

const Evento: React.FC = () => {
  /* const teste = express();
  teste.use(cors());
  async function exe() {
    let url = await fetch('https://nominatim.openstreetmap.org/ui/search.html?country=brazil');
    console.log(url);
  }
  exe(); */

  return (
    <div className='Evento'>
      <Cabecalho/>
      <Menu/>
      <Rodape/>
    </div>
  );
};

export default Evento;
