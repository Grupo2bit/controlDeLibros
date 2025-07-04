import path from "path";//me ayuda a trazar el camino a seguir de los enrutamientos
import express from "express";// para realizar la conexion con el servidor 
import morgan from "morgan";//monitorear solicitudes http
import cors from "cors";//permitiendo que aplicaciones de diferentes orígenes se comuniquen entre sí
const servidor = express();//para realizar la conexion con la constante servidor 

servidor.use(cors());
servidor.use(morgan("dev"));//para que se actualice conforme vamos realizando los cambios 
servidor.use(express.json());//para que la conexion que realicemos nos reciba un formato json
servidor.get('/',(sol , res)=>{
    res.status(404).send("No encontrado");//por si no encuentra la conexion me enviara esta respuesta 
});

export default servidor;