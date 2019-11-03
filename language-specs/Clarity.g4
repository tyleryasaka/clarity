grammar Clarity;

/* Lexer */
Letter : [a-zA-Z];
String : '"' ~'"'* '"' ;
WS : [ \r\n\t]+;
Digit : [0-9]+;

/* Parser */
r : module;
integer : Digit+;
identifier : (Digit | Letter)+;
module : identifier WS identifier WS String WS '{' WS ((function WS) | (type WS) | (module WS))+ '}';
accessor : identifier ('[' (integer | String) ']')+;
call : identifier WS* '(' identifier WS* ':' WS* value WS* (',' WS* identifier WS* ':' WS* value WS*)+ ')';
value : (identifier | call | tupleInstance | structInstance) accessor*;
type : (tuple | struct)+;
tuple : identifier WS identifier WS String WS '(' WS* identifier WS* (',' WS* identifier WS*)+ ')';
tupleInstance : '(' WS* value WS* (',' WS* value WS*)+ ')';
struct : identifier WS identifier WS String WS '{' WS* identifier WS* ':' WS* identifier (',' WS* identifier WS* ':' WS* identifier WS*)+ '}';
structInstance : '{' WS* identifier WS* ':' WS* value (',' WS* identifier WS* ':' WS* value WS*)+ '}';
function : identifier WS identifier WS identifier WS String WS '(' identifier WS identifier WS* (',' WS* identifier WS identifier WS*)+ ')' WS* '{' WS* (assignment WS*)+ ret WS* '}';
assignment : identifier WS identifier WS* '<-' WS* value ';';
ret : 'return' WS value ';';
