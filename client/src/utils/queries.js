import gql from "graphql-tag";

export const GET_ME = gql`
	{
		user {
			_id
			username
			email
			bookCount
			savedBooks
		}
	}
`;
