export interface DataMapper<Entity, EntitySchema> {
  toDomain(data: EntitySchema): Entity;
  toPersistence(domain: Entity): EntitySchema;
}
