import axios from 'axios'

const index = ({ user }) => {

  return (
    <div>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get(`http://localhost:3000/api/inblack67`);

  return { props: { user: res.data } };
}

export default index
