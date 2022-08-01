import Category from "../models/Category";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await Category.findAll({
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

    let category = await Category.findOne({
      where: {
        id
      }
    });

    if (!category) {
      return res.status(400).send({
        message: `Não foi possível encontrar a categoria com o ID ${id}`
      });
    }

    return res.status(200).send(category);
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
    let { name } = dados;

    let categoryExists = await Category.findOne({
      where: {
        name
      }
    });

    if (categoryExists) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe uma categoria cadastrada com esse nome!'
      });
    }

    let response = await Category.create({
      name
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
  let { name } = dados;
  let category = await Category.findOne({
    where: {
      id
    }
  });

  if (!category) {
    return res.status(400).send({ type: 'error', message: `Categoria com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => category[field] = dados[field]);

  await category.save();
  return res.status(200).send({
    message: `Categoria ${id} atualizada com sucesso`,
    data: category
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

    let category = await Category.findOne({
      where: {
        id,
      }
    });

    if (!category) {
      return res.status(400).send({ message: `Não foi encontrada nenhuma categoria resgistrada com o ID ${id}` })
    }

    await category.destroy();
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
  getAll,
  getById,
  create,
  destroy,
  persist,
}