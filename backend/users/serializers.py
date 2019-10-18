from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        allow_blank=True,
        label='Email address',
        max_length=254,
        required=True,
        write_only=True,
    )
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
        ]

    def create(self, validated_data):
        password = validated_data.get('password')
        del validated_data['password']
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        del validated_data['password']
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
