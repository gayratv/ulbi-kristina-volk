import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames, Modes } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { ErrorCodes, validKeyboardKeys } from 'shared/const/common';

import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country/ui/CountrySelect';

import { HStack, VStack } from 'shared/ui/Stack';
import {
  editableProfileCardActions,
} from '../model/slices/editableProfileCardSlice/editableProfileCardSlice';
import { getProfileFormData } from '../model/selectors/getProfileFormData/getProfileFormData';
import { ValidateProfileError } from '../model/types/EditableProfile';
import {
  getProfileFormReadonly,
} from '../model/selectors/getProfileFormReadonly/getProfileFormReadonly';
import {
  getProfileUpdateIsLoading,
} from '../model/selectors/getProfileUpdateIsLoading/getProfileIsLoading';
import {
  getProfileUpdateError,
} from '../model/selectors/getProfileUpdateError/getProfileUpdateError';
import {
  getProfileValidateErrors,
} from '../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import classes from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
	className?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const isLoading = useSelector(getProfileUpdateIsLoading);
  const error = useSelector(getProfileUpdateError);
  const profileFormData = useSelector(getProfileFormData);
  const readonly = useSelector(getProfileFormReadonly);
  const validateProfileErrors = useSelector(getProfileValidateErrors);

  const modes: Modes = {
    [classes.isEditing]: !readonly,
  };

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateData({ firstname: value || '' }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateData({ username: value || '' }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: string) => {
    dispatch(editableProfileCardActions.updateData({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country: string) => {
    dispatch(editableProfileCardActions.updateData({ country }));
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    dispatch(editableProfileCardActions.updateData({ age: Number(value || 0) }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((avatar?: string) => {
    dispatch(editableProfileCardActions.updateData({ avatar: avatar || '' }));
  }, [dispatch]);

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (
      !/[0-9]/.test(event.key)
      && !(Object.values(validKeyboardKeys).some((v) => v === event.key))
    ) {
      event.preventDefault();
    }
  };

  const validateErrorTranslates: Record<ErrorCodes | ValidateProfileError, string> = {
    [ErrorCodes.SERVER_DOWN]: t('Server error occurred'),
    [ErrorCodes.INCORRECT_CREDENTIALS]: t('Incorrect username or password'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Wrong country'),
    [ValidateProfileError.NO_DATA]: t('The data has not been entered'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Firstname and username are required'),
    [ValidateProfileError.INCORRECT_AGE]: t('Wrong age'),
  };

  if (isLoading) {
    return (
         <HStack justify="center">
              <Loader />
         </HStack>
    );
  }

  if (error) {
    return (
         <HStack
            justify="center"
            className={classNames(
              classes.EditableProfileCard,
              modes,
              [className],
            )}
         >
              <Text theme={TextTheme.ERROR} text={t(error)} />
         </HStack>
    );
  }

  return (
       <VStack
          max
          className={classNames(
            classes.EditableProfileCard,
            modes,
            [className],
          )}
       >
            {validateProfileErrors?.length && validateProfileErrors.map((validationError) => (
                 <Text
                    key={validationError}
                    theme={TextTheme.ERROR}
                    text={validateErrorTranslates[validationError]}
                 />
            ))}
            {profileFormData && (
                 <VStack align="center" max>
                      <Text title={t('profile')} />
                      <div>
                           {profileFormData.avatar
                             && (
                             <Avatar
                                src={profileFormData.avatar}
                                alt={t('avatar')}
                             />
                             )}
                      </div>
                      <VStack gap="16" align="center" max className={classes.profileData}>
                           <Input
                              value={profileFormData.firstname}
                              placeholder={t('enter your firstname')}
                              onChange={onChangeFirstname}
                              readonly={readonly}
                           />
                           <Input
                              value={profileFormData.username}
                              placeholder={t('enter your username')}
                              onChange={onChangeUsername}
                              readonly={readonly}
                           />

                           <CurrencySelect
                              readonly={readonly || false}
                              value={profileFormData?.currency}
                              onChangeOption={onChangeCurrency}
                           />

                           <CountrySelect
                              readonly={readonly || false}
                              value={profileFormData.country}
                              onChangeOption={onChangeCountry}
                           />
                           <Input
                              value={profileFormData.age}
                              type="number"
                              placeholder={t('enter your age')}
                              onChange={onChangeAge}
                              readonly={readonly}
                              onKeyPress={onKeyPress}
                           />
                           <Input
                              value={profileFormData.avatar}
                              placeholder={t('place the link to your new avatar')}
                              onChange={onChangeAvatar}
                              readonly={readonly}
                           />
                      </VStack>
                 </VStack>
            )}
       </VStack>
  );
});
