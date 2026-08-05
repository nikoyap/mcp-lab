import { Router } from "express";

import {
  getActivities
} from "../services/activity";


const router = Router();


router.get("/", (req,res)=>{

  res.json({

    success:true,

    activities:
      getActivities()

  });

});


export default router;
