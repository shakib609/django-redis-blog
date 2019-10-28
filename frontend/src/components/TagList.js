/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from '@reach/router';
import List from 'react-bulma-components/lib/components/list';

const TagList = ({ tags }) => (
  <List hoverable>
    <List.Item>
      <b>Tags</b>
    </List.Item>
    {Object.keys(tags).map(slug => (
      <List.Item key={slug}>
        <Link to={`/tags/${slug}`}>{slug}</Link>
      </List.Item>
    ))}
  </List>
);

export default TagList;
