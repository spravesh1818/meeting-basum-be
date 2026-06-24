// import redis from '../config/redis.js';

export const setCache = async (key, value, ttl) => {
    console.log("Cache set for key: ", key);
    await redis.set(key, value, 'EX', ttl);
}

export const getCache = async (key) => {
    console.log("Cache hit for key: ", key);
    return await redis.get(key);
}

export const deleteCache = async (key) => {
    await redis.del(key);
}