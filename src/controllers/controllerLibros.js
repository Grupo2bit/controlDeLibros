import { uploadSingleImage } from '../middlewares/upload.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';// maneja la subida de archivos
import modelLibro from '../models/modelLibro.js';

// Crear libro

const controllerLibros = {
    createBook: async (sol , res)=>{
        try{
            uploadSingleImage(sol,res,async(error)=>{
                if(error){
                    res.json({
                        result: 'mistake',
                        message: 'An error occurred while uploading the image',
                        data: error,
                    });
                }
                const newBook = new modelLibro({
                    titulo:sol.body.titulo,
                    autor:sol.body.autor,
                    categoria:sol.body.categoria,
                    ano_publicacion:sol.body.ano_publicacion,
                    disponible:sol.body.disponible,
                    ejemplares:sol.body.ejemplares,
                    imagen:sol.file.filename
                });

                const savedBook = await newBook.save();
                res.json({
                    result: 'fine',
                    message: 'Product create',
                    data: savedBook._id,
                });
            });

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred creating the product',
                data: error,
            });
        }
    },
    readBook : async (sol , res)=>{
        try{
            const bookFound = await modelLibro.findById(sol.params.id);
            if(bookFound._id){
                res.json({
                    result:'fine',
                    message: 'Libro encontrado',
                    data: bookFound,
                });
            }
    
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred reading the book',
                data: error,
            });
        }
    },
    
    readBook : async(sol , res)=>{
        try{
            const allBooksFound = await modelLibro.find();
            res.json({
                result: 'fine',
                message: ' Libro encontrado',
                data: allBooksFound
            });
        }catch(error){
            res.json({
                result: ' mistake',
                message: 'An error occurred reading all books',
                data: error,
            });
        }   
    },
        updateBook : async(sol , res)=>{
            try{
                uploadSingleImage(sol,res,async(error)=>{
                    if(error){
                        res.json({
                            result: ' mistake',
                            message: 'Error uploading image during update',
                            data: error,
                        });
                    }
    
                    const libroExistente = await modelLibro.findById(sol.params.id);
                    if(!libroExistente){
                        return res.status(404).json({
                            result: 'mistake',
                            message: 'book not found',
                            data: null,
                        });
                    }
    
                    if(sol.file){
                        const rutaImagenAntigua = path.join('imagenes',
                            libroExistente.imagen
                        );
                        if (fs.existsSync(rutaImagenAntigua)){
                            fs.unlinkSync(rutaImagenAntigua);
                        }
                    }
    
                    const nuevosDatos = {
                    titulo:sol.body.titulo,
                    autor:sol.body.autor,
                    categoria:sol.body.categoria,
                    ano_publicacion:sol.body.ano_publicacion,
                    disponible:sol.body.disponible,
                    ejemplares:sol.body.ejemplares,
                    imagen:sol.file ? sol.file.filename : libroExistente.imagen,
                    };
    
                    const libroActualizado = await modelLibro.findByIdAndUpdate(
                        sol.params.id,
                        nuevosDatos,
                        {new: true}
                    );
                    res.json({
                        result:'fine',
                        message:'Libro actualizado',
                        data: libroActualizado,
                    });
                })
    
            }catch(error){
                res.json({
                    result: ' mistake',
                    message: 'An error occurred updating all Books',
                    data: error,
                }); 
            }
        },
        deletebook : async (sol , res)=>{
            try{
                const bookDelete = await modelLibro.findByIdAndDelete(sol.params.id);
    
                if(bookDelete){
                    //si el libro fue eliminado que elimine tambien la imagen del sistema existente
                    const rutaImagen = path.join('imagenes',bookDelete.imagen);
                    if(fs.existsSync(rutaImagen)){
                        fs.unlinkSync(rutaImagen);
                    }
                    res.json({
                        result:'fine',
                        message:'Libro eliminado',
                        data: bookDelete._id,
                    });
                }else{
                    res.status(404).json({
                        result: ' mistake',
                        message: 'Book not found',
                        data: error,
                    });
                }
    
            }catch(error){
                res.json({
                    result: ' mistake',
                    message: 'An error occurred deleting all Books',
                    data: error,
                });
            }
        }
    }
    export default controllerLibros;        