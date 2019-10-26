/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from '@reach/router';
import List from 'react-bulma-components/lib/components/list';

const TagList = ({ tags }) => (
  <List hoverable>
    <List.Item>
      <b>Tags</b>
    </List.Item>
    {tags.map(tag => (
      <List.Item key={tag.id}>
        <Link to={`/tags/${tag.slug}`}>{tag.slug}</Link>
      </List.Item>
    ))}
  </List>
);

export default TagList;
