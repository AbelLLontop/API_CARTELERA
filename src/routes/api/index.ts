import { APIController} from './../../controllers/ApiController';
import {Router} from 'express';
const controller = new APIController();
const router = Router();

router.get('/',(req,res)=>{   
    res.send("Welcome to API CINEMA");
})
router.get('/chain',controller.getlistchains);
router.get('/chain/:chainId',controller.getDetailchains);
router.get('/cinema/:cinemaId',controller.getDetailCinema);
router.get('/movie/:movieId',controller.getDetailMovie);
router.get('/releases',controller.getListNextReleases);
router.get('/billboard',controller.getListbillboard);
router.get('/search/:movieName',controller.searchMovie);

export {router as RouterAPI};