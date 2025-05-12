exports.up = function(knex) {
    return knex.schema.table('consultas', function(table) {
      table.decimal('valor', 8, 2).defaultTo(150.00);
      table.string('status').defaultTo('pendente');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('consultas', function(table) {
      table.dropColumn('valor');
      table.dropColumn('status');
    });
  };
  