const Pedidos= require('../models/Pedidos');

//Agregar nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar todos los pedidos
exports.mostrarPedidos=async(req,res,next) =>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}
//Mostrar un pedido por su id
exports.mostrarPedido=async(req,res,next)=>{
    
        const pedido=await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        if(!pedido){
            res.json({mensaje:"EL pedido no existe"});
            return next();
        }
        res.json(pedido);
    
}

//Actualizar un pedido

exports.actualizarPedido=async(req,res,next)=>{
    try{
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        } ).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedido)
    }
    catch(error){
        console.log(error);
        next();
    }
}

//Eliminar un pedido por su id
exports.eliminarPedido=async(req,res,next)=>{
    try{
        await Pedidos.findOneAndDelete({_id:req.params.idPedido});
        res.json({mensaje:"El pedido se a eliminado correctamente"});
    }
    catch(error){
        console.log(error);
        next();
    }
}