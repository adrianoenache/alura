# Referências

## CPF COM GRUPO DIGITO VERIFICADOR:
	111.222.333-96
	Expressão Regular:
		\d{3}[-.]?\d{3}[.-]?\d{3}[.-]?(\d{2})

## MENSSAGEM CRIPTOGRAFADA
	Z171PZ7AZ23PZ7819AZ78GZ1AZ99IZ34O
	Expressão Regular:
		Z\d+(\w)

## EXCEPTION:
	Caused by: com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure
	Expressão Regular:
		(Caused[\s\w:.-]+):([\w\s]+)

## EMAIL ALURA:
	super.mario@caelum.com.br
	Expressão Regular:
		([a-z.]{4,14}[a-z\d])@(?:caelum.com.br|alura.com.br)

## QUALQUER EMAIL:
	TEAM.donkey-kong@MARIO.kart1.nintendo.com	
	Expressão Regular:
		^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$

## CORREIOS:
	Nico Steppat|14/05/1977|Rua Buarque de Macedo|50|22222-222|Rio de Janeiro
	Expressão Regular:
		([\w\s]+)\|(?:\d\d\/\d\d\/\d\d\d\d)\|([\w\s]+)\|(\d{1,4})\|(\d{5}-\d{3})\|(?:[\w\s]{10,})
