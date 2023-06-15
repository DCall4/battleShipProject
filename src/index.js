import footerDivInit from "./DOMelements/setUpFooter";
import headerDivInit from "./DOMelements/setUpHeader";
import gameBoardFactory from "./factories/gameBoard";
import playerFactory from "./factories/player";
import shipFactory from "./factories/ship";
import startScreen from "./gameController/startScreen";
import './style.css';

const container = document.querySelector('#container');

const battleShipStart = () => {
    container.textContent = '';
    headerDivInit();

    startScreen();

    footerDivInit();
}
battleShipStart();

export default battleShipStart
