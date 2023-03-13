import ReactNode from 'react';

interface type_repeat {
    numTimes: number;
    children: any;
  }

const Repeat = (props:type_repeat):JSX.Element => {

    let items:number[] = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

export default Repeat