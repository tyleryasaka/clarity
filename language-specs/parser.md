Uses [antlr4](https://github.com/antlr/antlr4).

```
antlr4 Clarity.g4 -o parser
javac parser/Clarity*.java
cd parser
grun Clarity r -gui
grun Clarity r -tree
```
