import DiscountCoupon from "../models/DiscountCoupon";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await DiscountCoupon.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Cupons de descontos', // mensagem para o front exibir
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

    let discountCoupon = await DiscountCoupon.findOne({
      where: {
        id
      }
    });

    if (!discountCoupon) {
      return res.status(400).send({
        message: `Não foi possível encontrar o cupom de desconto com o ID ${id}`
      });
    }

    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Cupons de descontos', // mensagem para o front exibir
      data: discountCoupon // json com informações de resposta
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
    let { discountCode, discountValue, discountType  } = dados;

    let discountCouponExists = await DiscountCoupon.findOne({
      where: {
        discountCode
      }
    });

    if (discountCouponExists) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe um cupom cadastrado com esse código!'
      });
    }

    let response = await DiscountCoupon.create({
      discountCode, discountValue, discountType
    });

    return res.status(200).send({
      type: 'success',
      message: 'Cupom cadastrado com sucesso!',
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
  let { discountCode, discountValue, discountType } = dados;
  let discountCoupon = await DiscountCoupon.findOne({
    where: {
      id
    }
  });

  if (!discountCoupon) {
    return res.status(400).send({ type: 'error', message: `Cupom de desconto com o ID ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => discountCoupon[field] = dados[field]);

  await discountCoupon.save();
  return res.status(200).send({
    message: `Cupom de desconto ${id} atualizado com sucesso`,
    data: discountCoupon
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um cupom de desconto existente para ser deletado!!'
      });
    }

    let discountCoupon = await DiscountCoupon.findOne({
      where: {
        id,
      }
    });

    if (!discountCoupon) {
      return res.status(400).send({ message: `Não foi encontrado nenhum cupom de desconto com o ID ${id}` })
    }

    await discountCoupon.destroy();
    return res.status(200).send({
      message: `Cupom de desconto informado foi deletado com sucesso`
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