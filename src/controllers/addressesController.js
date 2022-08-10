import Address from "../models/Address";
import jwt from "jsonwebtoken";
import usersController from "./usersController";

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }

    if (!id) {
      let response = await Address.findAll({ where: { idUser: user.id } });

      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response 
      });
    };

    let response = await Address.findOne({ where: { id, idUser: user.id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [] 
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message 
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
    let { idUser, zipcode, city, uf, address } = dados;

    let response = await Address.create({
      idUser, zipcode, city, uf, address
    });

    return res.status(200).send({
      type: 'success',
      message: 'Endereco cadastrada com sucesso!',
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
  let { idUser, zipcode, city, uf, address } = dados;
  let category = await Address.findOne({
    where: {
      id
    }
  });

  if (!address) {
    return res.status(400).send({ type: 'error', message: `Endereço com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => address[field] = dados[field]);

  await address.save();
  return res.status(200).send({
    message: `Endereço ${id} atualizado com sucesso`,
    data: address
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um Endereço existente para ser deletado!!'
      });
    }

    let address = await Address.findOne({
      where: {
        id,
      }
    });

    if (!address) {
      return res.status(400).send({ message: `Não foi encontrado nenhum endereço resgistrado com o ID ${id}` })
    }

    await address.destroy();
    return res.status(200).send({
      message: `O endereço informado foi deletado com sucesso`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

export default {
  get,
  create,
  destroy,
  persist,
}