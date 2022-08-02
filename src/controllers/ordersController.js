import Order from "../models/Order";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await Order.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: response // json com informações de resposta
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error
    });
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;

    //garante que o id só vai ter NUMEROS;
    id = id.toString().replace(/\D/g, '');
    if (!id) {
      return res.status(400).send({
        message: 'Informe um ID válido para realizar a consulta!'
      });
    }

    let order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res.status(400).send({
        message: `Não foi possível encontrar o pedido ${orderCode}`
      });
    }

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persist = async (req, res) => {
  try {
    let { id } = req.body;
    //caso nao tenha id, cria um novo registro
    if (!id) {
      return await create(req.body, res)
    }

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  try {
    let { orderCode, idCustomer, idDeliveryman, idDiscountCoupon, idPaymentForm } = dados;

    let response = await Order.create({
      orderCode, idCustomer, idDeliveryman, idDiscountCoupon, idPaymentForm
    });

    return res.status(200).send({
      type: 'success',
      message: 'Categoria cadastrada com sucesso!',
      data: response
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const update = async (id, dados, res) => {
  let { orderCode, idCustomer, idDeliveryman, idDiscountCoupon, idPaymentForm } = dados;
  let order = await Order.findOne({
    where: {
      id
    }
  });

  if (!order) {
    return res.status(400).send({ type: 'error', message: `Categoria com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => order[field] = dados[field]);

  await order.save();
  return res.status(200).send({
    message: `Categoria ${id} atualizada com sucesso`,
    data: order
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe uma categoria existente para ser deletada!!'
      });
    }

    let order = await Order.findOne({
      where: {
        id,
      }
    });

    if (!order) {
      return res.status(400).send({ message: `Não foi encontrada nenhuma categoria resgistrada com o ID ${id}` })
    }

    await order.destroy();
    return res.status(200).send({
      message: `A categoria informada foi deletada com sucesso`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

export default {
  getById,
  getAll,
  create,
  destroy,
  persist,
}