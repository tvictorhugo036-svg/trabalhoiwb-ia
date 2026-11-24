create table opinioes (
  id          bigint generated always as identity primary key,
  tema        text not null,
  resposta_1  text not null,
  resposta_2  int  not null check (resposta_2 between 1 and 5),
  resposta_3  text,
  criado_em   timestamptz not null default now()
);

alter table opinioes enable row level security;

create policy "qualquer um pode responder"
  on opinioes for insert with check (true);

create policy "qualquer um pode ver os resultados"
  on opinioes for select using (true);
