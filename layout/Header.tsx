import React from 'react';

type Props = {};

const Header = (props: Props) => {
    return (
        <div>
            <h1>잡행어사</h1>
            <style jsx>
                {`
                    div {
                    }
                    h1 {
                        text-align: center;

                        font-size: 50px;
                        background-color: tomato;
                    }
                `}
            </style>
        </div>
    );
};

export default Header;
