import cn from 'classnames';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  listItemButtonClasses,
} from '@mui/material';
import { COLOR_BLACK, COLOR_GREY2 } from '../../../theme/colors';
import { Delete, Duplicate } from '../../../icons';
import { ContextMenuProps } from './types';
import styles from './styles.module.scss';

const ContextMenu = ({ className, list }: ContextMenuProps) => (
  <Box className={cn(styles.box, className)}>
    <List>
      {list?.map(({ content, onClick, color, iconName }, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton style={{ gap: 16 }}>
            {iconName === 'duplicate' && <Duplicate />}
            {iconName === 'delete' && <Delete />}

            <ListItemText
              primary={
                <Typography style={{ color: color ?? COLOR_BLACK }}>
                  {content}
                </Typography>
              }
              onClick={onClick}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const StyledContextMenu = styled(ContextMenu)(() => ({
  [`& .${listItemButtonClasses.gutters}`]: {
    borderRadius: 4,
  },
  [`& .${listItemButtonClasses.gutters}:hover`]: {
    backgroundColor: COLOR_GREY2,
  },
}));
