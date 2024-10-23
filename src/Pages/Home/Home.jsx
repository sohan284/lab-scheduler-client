import React from 'react';
import ScheduledTasks from '../../components/ScheduledTasks/ScheduledTasks';
import TabNav from '../../Shared/TabNav';

const Home = () => {
    return (
        <div className='md:mt-5 px-4 xl:px-0'>
              <TabNav />
            <ScheduledTasks />
        </div>
    );
};

export default Home;