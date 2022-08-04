import PaymentMethod from "../models/PaymentMethod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await PaymentMethod.findAll({
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

    let paymentMethod = await PaymentMethod.findOne({
      where: {
        id
      }
    });

    if (!paymentMethod) {
      return res.status(400).send({
        message: `Não foi possível encontrar o método de pagamento com o ID ${id}`
      });
    }

    return res.status(200).send(paymentMethod);
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

    let paymentMethodExists = await PaymentMethod.findOne({
      where: {
        name
      }
    });

    if (paymentMethodExists) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe um método de pagamento cadastrado com esse nome!'
      });
    }

    let response = await PaymentMethod.create({
      name
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
  let { name } = dados;
  let paymentMethod = await PaymentMethod.findOne({
    where: {
      id
    }
  });

  if (!paymentMethod) {
    return res.status(400).send({ type: 'error', message: `Método de pagamento com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => paymentMethod[field] = dados[field]);

  await paymentMethod.save();
  return res.status(200).send({
    message: `Método de pagamento ${id} atualizado com sucesso`,
    data: paymentMethod
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

    let paymentMethod = await PaymentMethod.findOne({
      where: {
        id,
      }
    });

    if (!paymentMethod) {
      return res.status(400).send({ message: `Não foi encontrado nenhum método de pagamento com o ID ${id}` })
    }

    await paymentMethod.destroy();
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
  getAll,
  getById,
  create,
  destroy,
  persist,
}