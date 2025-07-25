import { prisma } from './connection'

export async function findUser(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } })
}

export async function createUser(userId: string) {
    return prisma.user.create({ data: { id: userId } })
}
