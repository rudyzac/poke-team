export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
