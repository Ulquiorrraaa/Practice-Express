import prisma from "../../prisma/client.js";

export const createUser = async (data) => {
    return prisma.user.create({data});
}

export const getUsers = async ()=> {
    return prisma.user.findMany(
        {
            select: {
                id: true,
                name: true,
                email: true,
            }
        }
    );
};

export const getUserById = async (id) => {
    return prisma.user.findUnique({
        where : {id},
        select:{
            name: true,
            email: true,
        }
    });
}
export const getUserByEmail = async (email)=> {
    return prisma.user.findUnique({where: {email}
    })
}
export const UpdateUser = async (id, data) => {
    return prisma.user.update({
        where: {id},
        data
    })
}
export const deleteUser = async (id) => {
    return prisma.user.delete({where:{id}});
}