from rest_framework_extensions.routers import ExtendedSimpleRouter

from .views import CommentViewSet, PostViewSet, TagViewSet

router = ExtendedSimpleRouter()

posts_routes = router.register(r'posts', PostViewSet, basename='post')
tags_routes = router.register(r'tags', TagViewSet, basename='tag')

posts_routes.register(
    r'comments',
    CommentViewSet,
    basename='posts-comment',
    parents_query_lookups=['post__slug'],
)
posts_routes.register(
    r'tags',
    TagViewSet,
    basename='posts-tag',
    parents_query_lookups=['posts__slug'],
)

tags_routes.register(
    r'posts',
    PostViewSet,
    basename='tags-post',
    parents_query_lookups=['tags__slug'],
)

urlpatterns = router.urls
