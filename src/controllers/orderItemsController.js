import OrderItem from "../models/OrderItem";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await OrderItem.findAll({
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

    let orderItem = await OrderItem.findOne({
      where: {
        id
      }
    });

    if (!orderItem) {
      return res.status(400).send({
        message: `Não foi possível encontrar o método de pagamento com o ID ${id}`
      });
    }

    return res.status(200).send(address);
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
    let { amount, price, idOrder, idItem } = dados;

    let response = await OrderItem.create({
      amount, price, idOrder, idItem 
    });

    return res.status(200).send({
      type: 'success',
      message: 'Método cadastrado com sucesso!',
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
  let { amount, price, idOrder, idItem  } = dados;
  let orderItem = await OrderItem.findOne({
    where: {
      id
    }
  });

  if (!orderItem) {
    return res.status(400).send({ type: 'error', message: `Método de pagamento com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => orderItem[field] = dados[field]);

  await orderItem.save();
  return res.status(200).send({
    message: `Método de pagamento ${id} atualizado com sucesso`,
    data: orderItem
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um método de pagamento existente para ser deletado!!'
      });
    }

    let orderItem = await OrderItem.findOne({
      where: {
        id,
      }
    });

    if (!orderItem) {
      return res.status(400).send({ message: `Não foi encontrado nenhum método de pagamento com o ID ${id}` })
    }

    await orderItem.destroy();
    return res.status(200).send({
      message: `Método de pagamento informado foi deletado com sucesso`
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