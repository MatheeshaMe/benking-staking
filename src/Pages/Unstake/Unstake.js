import React from 'react';
import StakingDapp from '../../components/StakingDapp/StakingDapp';

const Unstake = ({ unstakeId, setUnstakeId, unstake, unstakes, unstakeMany, account }) => {
    
    return (
        <div>
            { account
                ? <>
                    <StakingDapp
                        selectedId={unstakeId}
                        setSelectedId={setUnstakeId}
                        onClickCardBtn={unstake}
                        data={unstakes}
                        unstakeMany={unstakeMany}
                    />
                 </>
                : <></>
            }
        </div>
    );
};

export default Unstake;