import prisma from "../../prisma/client.js";

export const createTask = async (data) => {
  return prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      completed: false,
      userId: data.userId,
    },
  });
};

export const getTaskByUser = async (userId) => {
  return prisma.tasks.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getUserWithTask = async (id) => {
  return prisma.user.findUnique({
   where: { id },
    include: { tasks: true }
  });
};

export const getAllTasks = async (data) => {
    return prisma.tasks.findMany({
        include:{
            user:{
                select:{name:true}
            }
        }
    })
}

export const updateTask = async (id, data) => {
  return prisma.tasks.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id) => {
  return prisma.tasks.delete({
    where: { id },
  });
};
