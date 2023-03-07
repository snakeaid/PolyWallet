# Redis service

## Before starting

###### **You have to read at list next documentation https://redis.io/topics/data-types-intro**

### Restrictions

- You are restricted to use multikey queries because of Redis Cluster strategy (Cluster isn't supports multikey queries)

### Concept Usage

```typescript
class RedisBaseService {
  constructor(public entityName: string) {
  }

  getRedisKey(id, fieldName) {
    return `${entityName}:${id}:${fieldName}`;
  }
}

class PairRedis extends RedisBaseService {
  constructor(redisClient: RedisClient) {
    super('pair');
  }

  setPair(id, data) {
    redisClient.set(this.getRedisKey(id, description), 'Hello Pair');
  }

  getPair(id, data) {
    redisClient.get(this.getRedisKey(id, description));
  }
}
```
