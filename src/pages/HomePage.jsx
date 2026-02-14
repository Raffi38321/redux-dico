import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {asyncPopulateUsersAndThreads} from '../states/shared/action';
import ThreadCard from '../components/ThreadCard';
import TagCard from '../components/TagCard';

const HomePage = () => {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    setFilteredThreads(threads);
  }, [threads]);

  const addUserToThreads = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  const tags = [...new Set(threads.map((t) => t.category))];

  const handleFilterTag = ({text}) => {
    if (filteredThreads[0].category === text) {
      setFilteredThreads(threads);
    } else {
      const result = threads.filter((thread) => thread.category === text);
      setFilteredThreads(result);
    }
  };
  return (
    <div>
      <div className="flex flex-row gap-5">
        {tags.map((textTag, index) => (
          <TagCard
            key={index}
            tag={textTag}
            handleFilterTag={handleFilterTag}
          />
        ))}
      </div>
      {addUserToThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default HomePage;
