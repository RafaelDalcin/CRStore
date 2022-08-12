import Address from "../models/Address";
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
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }
    
    if (!id) {
      return await create(req.body, res, user)
    }

    return await update(id, req.body, res, user)
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error
    });
  }
}

const create = async (dados, res, user) => {
  let { address, city, zipcode, uf } = dados;

  let response = await Address.create({
    idUser: user.id,
    address,
    city,
    uf,
    zipcode
  });

  return res.status(200).send({
    type: 'success',
    message: `Cadastro realizado com sucesso`,
    data: response 
  });
}

const update = async (id, dados, res, user) => {
  let response = await Address.findOne({ where: { id, idUser: user.id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [] 
    });
  }

  Object.keys(dados).forEach(field => response[field] = dados[field]);

  await response.save();
  return res.status(200).send({
    type: 'sucess',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response
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