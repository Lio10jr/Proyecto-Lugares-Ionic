PGDMP     '    9    	            |         
   lugares-db    15.3    15.3 $               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    17493 
   lugares-db    DATABASE     �   CREATE DATABASE "lugares-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
    DROP DATABASE "lugares-db";
                postgres    false            �            1259    17532    comentarios    TABLE     �   CREATE TABLE public.comentarios (
    id integer NOT NULL,
    comentario text NOT NULL,
    lugar_id integer NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.comentarios;
       public         heap    postgres    false            �            1259    17531    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public          postgres    false    221            !           0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public          postgres    false    220            �            1259    17518    lugares    TABLE     �   CREATE TABLE public.lugares (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    url_imagen character varying(255) NOT NULL
);
    DROP TABLE public.lugares;
       public         heap    postgres    false            �            1259    17517    lugares_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lugares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lugares_id_seq;
       public          postgres    false    219            "           0    0    lugares_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lugares_id_seq OWNED BY public.lugares.id;
          public          postgres    false    218            �            1259    17495    roles    TABLE     b   CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    17494    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    215            #           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    214            �            1259    17502    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol_id integer NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    17501    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    217            $           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    216            w           2604    17535    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            v           2604    17521 
   lugares id    DEFAULT     h   ALTER TABLE ONLY public.lugares ALTER COLUMN id SET DEFAULT nextval('public.lugares_id_seq'::regclass);
 9   ALTER TABLE public.lugares ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            t           2604    17498    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            u           2604    17505    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217                      0    17532    comentarios 
   TABLE DATA           K   COPY public.comentarios (id, comentario, lugar_id, usuario_id) FROM stdin;
    public          postgres    false    221   �&                 0    17518    lugares 
   TABLE DATA           9   COPY public.lugares (id, nombre, url_imagen) FROM stdin;
    public          postgres    false    219   7'                 0    17495    roles 
   TABLE DATA           +   COPY public.roles (id, nombre) FROM stdin;
    public          postgres    false    215   F(                 0    17502    usuarios 
   TABLE DATA           G   COPY public.usuarios (id, nombre, email, password, rol_id) FROM stdin;
    public          postgres    false    217   u(       %           0    0    comentarios_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.comentarios_id_seq', 6, true);
          public          postgres    false    220            &           0    0    lugares_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.lugares_id_seq', 3, true);
          public          postgres    false    218            '           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    214            (           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 7, true);
          public          postgres    false    216            �           2606    17539    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public            postgres    false    221                       2606    17525    lugares lugares_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.lugares
    ADD CONSTRAINT lugares_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.lugares DROP CONSTRAINT lugares_pkey;
       public            postgres    false    219            y           2606    17500    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    215            {           2606    17511    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            postgres    false    217            }           2606    17509    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    217            �           2606    17540 %   comentarios comentarios_lugar_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_lugar_id_fkey FOREIGN KEY (lugar_id) REFERENCES public.lugares(id);
 O   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_lugar_id_fkey;
       public          postgres    false    221    3199    219            �           2606    17545 '   comentarios comentarios_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 Q   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_usuario_id_fkey;
       public          postgres    false    221    217    3197            �           2606    17512    usuarios usuarios_rol_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);
 G   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_rol_id_fkey;
       public          postgres    false    215    217    3193               v   x��A�@ ��+�0D�`8z!�K��tۄuI�����TpW�����E���k��=ˢ�{�3�|�A(���gR�=������w㥃��	n6[&J�%-�e	!�~�逈�""         �   x�m��j�0����qL4����,{jaYJ/�ѦhL�Ч�x�=|0?��'�gg��l��py4�G�>��u�hTn�Y�m �g�ٸea�C@�C.�����߮O���k�}�!-�'xq�o)���(��6�3ـ���(�(������N��Ԭ<��QM2��(s�-�؉i����a�"��n�j�qc��O�䂳Ŏ�?f�7��28j3����H��`&h�.����\�Z������Ͼgi�� 0rn            x�3�LL����2�,-.M,������� QQC         �   x�e�9�0 @�:9u�:%��8c'!(ਧw�����:��y���e����J)Ȓ��ʏ"�8�r<O�`K���,&��(��T�f�<X˕O�QJ�� {r�;؏�qߜ���4s�Fg�R���[�D
�W�]���M��Fz��j��(�� �J_7�     