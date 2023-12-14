interface Prop {
    params:{
        id: string;
    }
}

export default function Dashboard({params:{id}}: Prop) {
  return <>
    {id}
  </>;
}
