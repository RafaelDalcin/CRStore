import Item from "../models/Item";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await Item.findAll({
      order: [['id', 'ASC']],
      include: ['category']
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

    let item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res.status(400).send({
        message: `Não foi possível encontrar o método de pagamento com o ID ${id}`
      });
    }

    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: item // json com informações de resposta
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error
    });
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
    let { name, price, idCategory, image, amount} = dados;

    let response = await Item.create({
      name, price, idCategory, amount, image
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
  let { name, price, idCategory, amount } = dados;
  let item = await Item.findOne({
    where: {
      id
    }
  });

  if (!item) {
    return res.status(400).send({ type: 'error', message: `Método de pagamento com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => item[field] = dados[field]);

  await item.save();
  return res.status(200).send({
    message: `Método de pagamento ${id} atualizado com sucesso`,
    data: item
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

    let item = await Item.findOne({
      where: {
        id,
      }
    });

    if (!item) {
      return res.status(400).send({ message: `Não foi encontrado nenhum método de pagamento com o ID ${id}` })
    }

    await item.destroy();
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