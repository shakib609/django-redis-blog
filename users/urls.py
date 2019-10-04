from rest_framework_extensions.routers import ExtendedSimpleRouter

from .views import UserViewSet
from posts.views import PostViewSet

router = ExtendedSimpleRouter()
users_route = router.register(
    r'users',
    UserViewSet,
    basename='user',
)

users_route.register(
    r'posts',
    PostViewSet,
    basename='users-post',
    parents_query_lookups=['author__username'],
)

urlpatterns = router.urls
